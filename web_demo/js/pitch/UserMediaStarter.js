var UserMediaStarter = function() {
    /**
     * 음계와 주파수를 담고 있는 개체.
     * @type {Object} pitchData
     * @type {boolean} pitchData.isConfident 소리가 너무 작아 불분명하면 false, 아니면 true.
     * @type {number} pitchData.pitch
     * @type {string} pitchData.note
     */
    this.pitchData = {
        isConfident: false,
        pitch: 0,
        note: "-"
    };

    this.getPitchData = function() {
        return this.pitchData;
    };

    this.error = function() {
        alert('Stream generation failed.');
    };

    /**
     * navigator의 getUserMedia를 호출한다. 굳이 있는 함수를 재정의한 이유는 예외처리를 하기 위함.
     * @param dictionary
     * @param callback
     */
    this.getUserMedia = function(dictionary, callback) {
        try {
            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia;
            navigator.getUserMedia(dictionary, callback, this.error);
        } catch (e) {
            alert('getUserMedia threw exception :' + e);
        }
    };

    /**
     * getUserMedia 함수의 콜백함수. updatePitch를 호출한다.
     * @param stream navigator.getUserMedia에서 알아서 넣어주는 값.
     */
    this.gotStream = function(stream) {
        // Create an AudioNode from the stream.
        mediaStreamSource = audioContext.createMediaStreamSource(stream);

        // Connect it to the destination.
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        mediaStreamSource.connect( analyser );
        this.pitchData = pitchUpdater.updatePitch();
    };

    /**
     * 시작점. getUserMedia를 호출한다.
     */
    this.startLiveInput = function() {
        this.getUserMedia(
            {
                "audio": {
                    "mandatory": {
                        "googEchoCancellation": "false",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "false",
                        "googHighpassFilter": "false"
                    },
                    "optional": []
                }
            },
            this.gotStream
        );
    };
};