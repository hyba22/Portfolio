import {useRef, useEffect} from 'react';
import * as THREE from 'three';


export default function ThreeBackground (){

    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        // to make sure mountRef.current exists
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);
        camera.position.z = 5;

        //space bg :: dense white stars 
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 1500;
        const starPostions = new Float32Array(starCount* 3);
        for(let i =0; i < starCount/3; i++){
            starPostions[i]= (Math.random()-0.5) * 100; // so we can spread stars over larger area 
        }
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPostions,3));
        const starMaterial = new THREE.PointsMaterial({color:0xffffff, size:0.1});
        const starField = new THREE.Points(starGeometry, starMaterial);
        scene.add(starField);

        //here parallax effect : to make stars move or interact with cursor 
        const handleMouseMove = (event : any) =>{
            const mouseX = (event.clientX / window.innerHeight) *2 -1;
            const mouseY = -(event.clientY / window.innerHeight) *2 +1;
            starField.rotation.x += mouseY *0.01;
            starField.rotation.y += mouseX *0.01;

        };

        window.addEventListener('mousemove',handleMouseMove);

        //responsive part
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        //render loop
        const animate = () => {
            requestAnimationFrame(animate);
            starField.rotation.x += 0.001; //slow rotation 
            starField.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
        animate();
    }, [])

    return (
        <div
            ref={mountRef}
            className="fixed inset-0 -z-10 w-screen h-screen m-0 p-0 cursor-none"
        >
        </div>
    )
}