import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { usePlayerControls } from "../Controller/Controller";
import * as THREE from "three";

const BaseCharacter = (props) => {
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const speed = new THREE.Vector3();
  const SPEED = 5;
  const { camera } = useThree();
  const [ref, api] = useSphere((index) => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 10, 0],
    ...props,
  }));
  const { movement, cameraMovement } = usePlayerControls();
  const { forward, backward, left, right, jump } = movement;
  const velocity = useRef([0, 0, 0]);
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity]);
  useFrame(() => {
    ref.current.getWorldPosition(camera.position);
    camera.position.y += 1;
    camera.rotation.y -= cameraMovement.x * 0.001;
    camera.rotation.x -= cameraMovement.y * 0.001;
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);
    speed.fromArray(velocity.current);
    api.velocity.set(direction.x, velocity.current[1], direction.z);
    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) api.velocity.set(velocity.current[0], 3, velocity.current[2]);
  });
  return (
    <group>
      <mesh castShadow position={props.position} ref={ref}>
        <meshStandardMaterial opacity={0} />
      </mesh>
    </group>
  );
};

export default BaseCharacter;
