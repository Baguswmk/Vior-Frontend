import { useMemo, useState } from "react";
import { useGLTF, useFBX } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";
import Loading from "../../Layout/Loading";

const Viewer = ({ model, ...props }) => {
  const { url } = model;
  const [isLoading, setIsLoading] = useState(true);
  const [scene, setScene] = useState(null);
  
  useMemo(() => {
    if (url.endsWith(".glb") || url.endsWith(".gltf")) {
      const { scene } = useGLTF(url);
      setScene(scene);
      setIsLoading(false);
    } else if (url.endsWith(".fbx")) {
      const { scene } = useFBX(url);
      setScene(scene);
      setIsLoading(false);
    } else if (url.endsWith(".obj")) {
      const objLoader = new OBJLoader();
      objLoader.load(
        url,
        (obj) => {
          setScene(obj);
          setIsLoading(false);
        },
        undefined,
        (error) => console.error("Error loading OBJ:", error)
      );
    } else if (url.endsWith(".skp")) {
      const skpLoader = new ColladaLoader();
      skpLoader.load(
        url,
        (skp) => {
          setScene(skp.scene);
          setIsLoading(false);
        },
        undefined,
        (error) => console.error("Error loading SKP:", error)
      );
    } else {
      console.warn("Unsupported model format:", url);
      setScene(null);
    }
  }, [url]);

  const [ref] = useBox(() => ({
    type: "Static",
    mass: 1,
    args: props.args,
    position: props.position,
    ...props,
  }));

  if (isLoading) {
    return <Loading />;
  }

  if (!scene) {
    return <div>Unsupported model format</div>;
  }

  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={scene} scale={props.scale} />
    </group>
  );
};

export default Viewer;
