window.onload = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvas = document.getElementById("canvas");
    
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    
    let rendered = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);
    
    let scene = new THREE.Scene();
    
    // (Угол обзора, ширина/высоту(пропорция камеры), не ближе чем 1/10px, не дальше чем 5000px)
    let camera = new THREE.PerspectiveCamera(45, width/height, .1, 5000);
    camera.position.set(0, 0, 1000);
    
    // Свет
    let light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    
    // Ширина, высота и кол-во фрагментов
    let geometry = new THREE.PlaneGeometry(300, 300, 12, 12);
}