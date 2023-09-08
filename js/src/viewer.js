import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Light } from './light.js'

var completeViewer = null;

function create() {

    completeViewer = new Viewer();
    createUI();
    completeViewer.createViewer();
    completeViewer.animate();
}

function createUI() {
    const para = document.createElement("div");
    para.id = "info";
    const button1 = document.createElement("button");
    button1.id = "description1";
    button1.className = "description";
    button1.innerHTML = "Create Plane"
    button1.onclick = () => {
        completeViewer.createPlane();
    };

    const button2 = document.createElement("button");
    button2.id = "description2";
    button2.className = "description";
    button2.innerHTML = "Add Light Source"
    button2.onclick = () => {
        completeViewer.addDirectionalLight();
        // completeViewer.setLightsEnvironment();
        //document.addEventListener("mousemove", completeViewer.onMouseMove.bind(completeViewer), false);

    };

    para.appendChild(button1);
    para.appendChild(button2);
    document.body.appendChild(para);
}

class Viewer {

    constructor() {
        this.camera = null;
        this.controls = null;
        this.container = null;
        this.scene = null;
        this.lights = null;
        this.renderer = null;
        this.mouse = null;
        this.raycaster = null;
        this.widthO = 1280;
        this.heightO = 680;
        this.ifRotationActive = false;
        this.sceneObject = null;
        this.light = new Light();
    }

    createViewer() {
        //container
        this.container = document.getElementById('canvas');
        document.body.appendChild(this.container);

        //renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.widthO, this.heightO);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMapSoft = false;
        this.renderer.setClearColor(0x404040);
        this.container.appendChild(this.renderer.domElement);

        //scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xe5e5e5);

        //camera
        this.camera = new THREE.PerspectiveCamera(45, this.widthO / this.heightO, 10, 10000);
        this.camera.position.set(0, 0, 0);
        this.camera.lookAt(this.scene.position)
        this.scene.add(this.camera);
        this.mouse = new THREE.Vector3();
        this.raycaster = new THREE.Raycaster();
        this.lights = new THREE.AmbientLight();
        this.scene.add(this.lights);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        //Window Resize Event
        window.addEventListener('resize', this.onWindowResize, false);
        this.renderer.setSize(this.widthO, this.heightO);
        this.add3DObjects();

    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

    }

    addDirectionalLight() {
        this.lightss = new THREE.DirectionalLight(0x00ff00);
        this.lightss.castShadow = true;
        this.lightss.shadow.camera.scale.set(100, 100, 100);
        this.lightss.position.set(10, 900, 10);
        this.scene.add(this.lightss);
    }


    onMouseMove() {
    //Needs to be implemented
    }

    add3DObjects() {
        var _this = this;
        var mainAssembly = new THREE.Object3D();
        // Create two cubes
        const cube1Geometry = new THREE.BoxGeometry(100, 100, 100);
        const cube1Material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const cube1 = new THREE.Mesh(cube1Geometry, cube1Material);
        cube1.position.set(200, 0.5, 0);
        mainAssembly.add(cube1);
        //this.scene.add(cube1);

        const cube2Geometry = new THREE.BoxGeometry(100, 100, 100);
        const cube2Material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const cube2 = new THREE.Mesh(cube2Geometry, cube2Material);
        cube1.castShadow = true;
        cube2.castShadow = true;
        cube2.position.set(-200, 0.5, 0);
        mainAssembly.add(cube2);
        this.scene.add(mainAssembly);
        _this.camera.position.set(-6.069278419859548, 557.1815190983408, -755.9653529466827);
        _this.controls.target.set(7.1635075650643545, -55.908141516834824, 42.12205419191191);
        _this.controls.update();
        this.sceneObject = mainAssembly;
    }

    createPlane(event) {
        var _this = this;
        const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 1000, 1000);
        planeGeometry.rotateX(-Math.PI / 2);
        const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x8fa192 })
        planeMaterial.opacity = 0.8;
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(0, -100, 0)
        plane.receiveShadow = true;
        this.scene.add(plane);
    }

    animate() {
        "use strict"
        if (this.animate) {
            this.frameId = requestAnimationFrame(this.animate.bind(this));
        }
        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

}

export { completeViewer, create }
