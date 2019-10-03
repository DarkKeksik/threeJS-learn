window.onload = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvas = document.getElementById("canvas");
    
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    
    let renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);
    
    let scene = new THREE.Scene();
    
    // (Угол обзора, ширина/высоту(пропорция камеры), не ближе чем 1/10px, не дальше чем 5000px)
    let camera = new THREE.PerspectiveCamera(45, width/height, .1, 5000);
    camera.position.set(0, 0, 1000);
    
    // Свет
    let light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    
    // Ширина, высота и кол-во фрагментов
    let geometry = new THREE.SphereGeometry(200, 12, 12);
    // wireframe - Обтянутый материалом или нет
    let material = new  THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
    
    for (let i = 0; i < geometry.faces.length; i++) {
        geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
    }
    
    let mesh = new THREE.Mesh(geometry, material);    
    scene.add(mesh);

    let loop = () => {
        mesh.rotation.y += Math.PI / 500;
        mesh.rotation.x += Math.PI / 500;
        
        renderer.render(scene, camera);
        requestAnimationFrame(()=>{
            loop();
        });
    }
    loop();
}