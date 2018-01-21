var SoundDecoder = function() {
    this.minSamples = 0;  // will be initialized when AudioContext is created.
    this.goodEnoughCorrelation = 0.9; // this is the "bar" for how close a correlation needs to be

    /**
     * pitch값으로부터 계이름을 계산한다.
     * @param {number} frequency
     * @returns {number}
     */
    this.noteFromPitch = function(frequency) {
        var noteNum = 12 * ( Math.log(frequency / 440) / Math.log(2) );
        return Math.round(noteNum) + 69;
    };

    /**
     * pitch값(주파수)을 반환한다.
     * 원래 라이브러리에 있던 함수 그대로 쓴거고 이해하기 싫다. 솔직히 어떻게 동작하는지 모른다. 원래 이름은 autoCorrelate였다.
     * @param {Float32Array} buf
     * @param {AudioContext.sampleRate} sampleRate
     * @returns {number} 에러 나면 -1을 리턴한다.
     */
    this.pitchFromRate = function(buf, sampleRate) {
        var size = buf.length;
        var maxSamples = Math.floor(size / 2);
        var bestOffset = -1;
        var bestCorrelation = 0;
        var rms = 0;
        var foundGoodCorrelation = false;
        var correlations = new Array(maxSamples);

        for (var i = 0; i < size; i++) {
            var val = buf[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / size);
        if (rms < 0.01) // not enough signal
            return -1;

        var lastCorrelation = 1;
        for (var offset = this.minSamples; offset < maxSamples; offset++) {
            var correlation = 0;

            for (i = 0; i < maxSamples; i++) {
                correlation += Math.abs((buf[i]) - (buf[i + offset]));
            }
            correlation = 1 - (correlation/maxSamples);
            correlations[offset] = correlation; // store it, for the tweaking we need to do below.
            if ((correlation > this.goodEnoughCorrelation) && (correlation > lastCorrelation)) {
                foundGoodCorrelation = true;
                if (correlation > bestCorrelation) {
                    bestCorrelation = correlation;
                    bestOffset = offset;
                }
            } else if (foundGoodCorrelation) {
                // short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
                // Now we need to tweak the offset - by interpolating between the values to the left and right of the
                // best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
                // we need to do a curve fit on correlations[] around bestOffset in order to better determine precise
                // (anti-aliased) offset.

                // we know bestOffset >=1,
                // since foundGoodCorrelation cannot go to true until the second pass (offset=1), and
                // we can't drop into this clause until the following pass (else if).
                var shift = (correlations[bestOffset + 1] - correlations[bestOffset - 1]) / correlations[bestOffset];
                return sampleRate / (bestOffset + (8 * shift));
            }
            lastCorrelation = correlation;
        }
        if (bestCorrelation > 0.01) {
            return sampleRate / bestOffset;
        }
        return -1;
    }
};


