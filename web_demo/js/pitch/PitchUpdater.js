var PitchUpdater = function(audioContext) {
    /**
     * pitchData 객체를 만들어 반환한다. 현재는 콘솔에 출력까지 한다.
     * @returns {{isConfident: boolean, pitch: number, note: string}}
     */
    this.updatePitch = function() {
        var bufLen = 1024;
        var buf = new Float32Array(bufLen);
        var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

        var pitchData = {
            isConfident: false,
            pitch: 0,
            note: "-"
        };

        try {
            analyser.getFloatTimeDomainData(buf);
        }
        catch(error) {
            if(error instanceof ReferenceError) {
                analyser = null;
            }
        }

        var pitch = soundDecoder.pitchFromRate( buf, audioContext.sampleRate );
        if (pitch === -1) {
            pitchData = {
                isConfident: false,
                pitch: 0,
                note: "-"
            };
        } else {
            var note = soundDecoder.noteFromPitch( pitch );
            pitchData = {
                isConfident: true,
                pitch: Math.round( pitch ),
                note: noteStrings[note % 12]
            };
        }

        // TODO: Replace this logging code with the code that updates the html elements
        if(pitchData.isConfident) {
            console.log("음계: " + pitchData.note+ " / 주파수: " + pitchData.pitch);
        }

        return pitchData;
    };
};