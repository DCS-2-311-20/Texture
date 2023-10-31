//
// 応用プログラミング 第6回 課題1 (ap0601)
// G184002021 拓殖太郎
//
"use strict"; // 厳格モード

import * as THREE from 'three';
import { TrackballControls } from 'control';
import GUI from 'gui';

// ３Ｄページ作成関数の定義
function init() {
  const controls = {
    rotation: 2,
    axes: true,
    reset: function() {
      // カメラの制御をリセットする
      trackballControls.reset();
      trackballControls.target = new THREE.Vector3(0,1,0);
    }
  };

  // シーン作成
  const scene = new THREE.Scene();

  // カメラの設定
  const camera = new THREE.PerspectiveCamera(
    80, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(3,2,4);
  camera.lookAt(0,1,0);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x406080);
  // レンダラに影の処理をさせる
  
  // Webページに描画領域を対応させる
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  // カメラコントロール
  const trackballControls = new TrackballControls(camera, renderer.domElement);
  trackballControls.rotateSpeed = 1.0;
  trackballControls.zoomSpeed = 1.0;
  trackballControls.panSpeed = 1.0;
  trackballControls.target = new THREE.Vector3(0, 1, 0);

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);

  // テクスチャの読み込み
  // const textureLoader = new THREE.TextureLoader();
  // const texture1 = textureLoader.load("logo.png");
  // const texture2 = textureLoader.load("myPict.png");

  // 立方体の作成
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // 立方体にテクスチャを登録
  // cubeMaterial.map = texture1;

  // 立方体の位置
  cube.position.y = 2;
  cube.position.x = -3;
  // 立方体は影を作る
  
  // シーンに立方体を加える
  scene.add(cube);

  // 球の作成
  const sphereGeometry = new THREE.SphereGeometry(1, 24, 24);
  const sphereMaterial = new THREE.MeshPhongMaterial();
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // 球にテクスチャを登録
  // sphereMaterial.map = texture2;

  // 球の位置
  sphere.position.set(2.5, 2, -1);
 
  // 球は影を作る
  
  // シーンに球を加える
  // scene.add(sphere);

  // 平面の作成
  const circle = new THREE.Mesh(
    new THREE.CircleGeometry(20, 24),
    new THREE.MeshLambertMaterial({ color: 0x008010 }));
  circle.rotation.x = -Math.PI / 2;
  // 平面は影を受け止める
  
  // シーンに平面を加える
  scene.add(circle);

  // 光源の作成
  const light = new THREE.DirectionalLight();
  light.position.set(3, 6, 8);
  light.castShadow = true;
  scene.add(light);

  // 自動販売機の作成
  // 素材に関する処理
  // const venderTexture01 = textureLoader.load("vender01.jpg");
  // const venderTexture02 = textureLoader.load("vender02.jpg");
  const venderMaterial = new THREE.MeshPhongMaterial({ color: 0xE8E7E5 });
  // const vender01Material = new THREE.MeshPhongMaterial({ map: venderTexture01 });
  // const vender02Material = new THREE.MeshPhongMaterial({ map: venderTexture02 });

  // 自動販売機1号
  const vender01 = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.8, 0.9),
    [
      // 面ごとの素材の設定
      venderMaterial, // 左
      venderMaterial, // 右
      venderMaterial, // 上
      venderMaterial, // 下
      venderMaterial, // 前
      venderMaterial, // 後
    ]
  )
  // 自販機の影の設定

  // 自販機の位置の設定

  // 自販機をシーンに追加する
  // scene.add(vender01);
  // 自動販売機2号
  const vender02 = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 1.8, 0.9),
    [
      // 面ごとの素材の設定
      venderMaterial, // 左
      venderMaterial, // 右
      venderMaterial, // 上
      venderMaterial, // 下
      venderMaterial, // 前
      venderMaterial, // 後
    ]
  )
  // 自販機の影の設定
  
  // 自販機の位置の設定

  // 自販機をシーンに追加する
  
  // 描画関数の定義

  function render() {
    // カメラ制御の更新
    trackballControls.update();
    // 座標軸のON/OFF
    axes.visible = controls.axes;
    // 物体の回転
    cube.rotation.y += 0.01 * controls.rotation;
    sphere.rotation.y -= 0.01 * controls.rotation;
    // 描画
    renderer.render(scene, camera);
    // アニメーション
    requestAnimationFrame(render);
  }

  // GUIコントローラ
  const gui = new GUI();
  gui.add(controls, "rotation", -10, 10);
  gui.add(controls, "axes");
  gui.add(controls, "reset");

  // 最初の描画
  render();
}

// 3Dページ作成関数の呼び出し
init();
