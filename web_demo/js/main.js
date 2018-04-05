/* *** 전체 흐름 ***
 *
 * 1. UserMediaStarter.js
 * getUserMedia()를 호출하여 마이크로부터 소리 데이터를 입력받고 콜백함수에서 PitchUpdater의 updatePitch 함수를 호출한다.
 *
 * 2. PitchUpdater.js
 * SoundDecoder의 함수들을 이용해서 소리데이터를 해석한 결과를 객체에 담아 반환한다.
 *
 * 3. SoundDecoder.js
 * 소리데이터를 pitch로, pitch값을 note로 변환한다.
 */

function SoundToPitchData() {
    audioContext = new AudioContext();
    soundDecoder = new SoundDecoder();
    pitchUpdater = new PitchUpdater(audioContext);
    userMediaStarter = new UserMediaStarter();

    userMediaStarter.startLiveInput();
    setInterval(pitchUpdater.updatePitch, 100);
}

window.onload = function () {
    console.log(
        "                                __T__I___...__7~\n" +
        "                  ,_           `\"|-=||==|==|==|\n" +
        "                  [_`'---...,____|\"_||__|__|__|_\n" +
        "                  | `'---...__PYEONGPYEONG_______]\n" +
        "            ~^~-~^-^~^'----~^~---~---------~^---'`~^-^~~^-^~^"
    );
    SoundToPitchData();
};