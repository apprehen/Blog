console.log('EXPLOSION!!!');
const cubism4Model = "http://localhost:4000/js/live2dpochi/character/model.json";
console.log(window.screen.width);
if (window.screen.width > 1000) {
  (async function main() {

    const app = new PIXI.Application({
      view: document.getElementById("canvas"),
      autoStart: true,
      resolution: window.devicePixelRatio || 1,
      width: 200,
      height: 200,
      antialias: true,
      transparent: true
    });
    // if (this.view.style.backgroundColor != stage.backgroundColorString) this.view.style.backgroundColor = stage.backgroundColorString;
    // app.renderer.backgroundColor = 0xffffff;
    const model4 = await PIXI.live2d.Live2DModel.from(cubism4Model);
    app.stage.addChild(model4);
    model4.scale.set(0.08);
    model4.position.set(-60, -60);
    model4.on('hit', async (hitAreas) => {
      console.log(hitAreas)
      if (hitAreas.length == 1) {
        if (hitAreas[0] == '脑袋') {
          model4.motion('Tap摸头')
        } else if (hitAreas[0] == '身体') {
          model4.motion('Tap身体')
        } else if (hitAreas[0] == '辫子') {
          model4.motion('Tap摇头')
        } else {
          model4.motion('Idle')
        }
      } else {
        let random = Math.floor(Math.random() * hitAreas.length)
        let hitArea = hitAreas[random]
        console.log(hitArea)
        if (hitArea === '脑袋') {
          model4.motion('Tap摸头')
        } else if (hitArea === '身体') {
          model4.motion('Tap身体')
        }
      }
    })
  })();
} else {
  console.log('screen too small');
}
