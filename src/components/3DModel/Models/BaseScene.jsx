import { Canvas } from "@react-three/fiber";
import { Loader, PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import Lights from "./Lights";
import Floor from "./Floor";

const BasicScene = ({ children }) => {
  return (
    <div className="w-full h-screen">
      <div id="joystick" className="flex md:hidden absolute bottom-[25%] left-[10%] w-16 h-16"></div>
      <div id="touchscreen" className="absolute md:hidden z-[100] opacity-30 top-0 right-0 w-3/4 h-full"></div>
      <Canvas shadows camera={{ fov: 50 }}>
        <Physics gravity={[0, -9.8, 0]}>
          <Lights />
          {children}

          <Floor rotation={[Math.PI / -2, 0, 0]} color="white" />
        </Physics>

        <PointerLockControls />
      </Canvas>
      <Loader />
    </div>
  );
};

export default BasicScene;
