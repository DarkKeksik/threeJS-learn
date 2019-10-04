window.onload = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvas = document.getElementById("canvas");
    
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    
    // Объект сферы
    let ball = {
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0
    }
    var gui = new dat.gui.GUI();
    gui.add(ball, "positionY").min(-10).max(10).step(0.1);
    gui.add(ball, "positionX").min(-10).max(10).step(0.1);
    gui.add(ball, "positionZ").min(-10).max(10).step(0.1);
    
    gui.add(ball, "rotationX").min(-0.2).max(0.2).step(0.001);
    gui.add(ball, "rotationY").min(-0.2).max(0.2).step(0.001);
    gui.add(ball, "rotationZ").min(-0.2).max(0.2).step(0.001);
    
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
//    let material = new  THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
//    for (let i = 0; i < geometry.faces.length; i++) {
//        geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
//    }
    
    const loader = new THREE.TextureLoader();
    let material = new  THREE.MeshBasicMaterial({map: loader.load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCIDPAPPzptBL8iHh0FT67Av1NbczEW44m_WNswbwLjKLSzXPP')});
    
    let mesh = new THREE.Mesh(geometry, material);    
    scene.add(mesh);

    let loop = () => {
        mesh.position.x += ball.positionX;
        mesh.position.y += ball.positionY;
        mesh.position.z += ball.positionZ;
        
        mesh.rotation.x += ball.rotationX;
        mesh.rotation.y += ball.rotationY;
        mesh.rotation.z += ball.rotationZ;

        
        renderer.render(scene, camera);
        requestAnimationFrame(()=>{
            loop();
        });
    }
    loop();
}