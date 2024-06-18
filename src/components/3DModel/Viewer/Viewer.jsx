import { useMemo, useState } from "react";
import { useGLTF, useFBX } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import PropTypes from "prop-types";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader"; // Import SKPParser
import Loading from "../../Layout/Loading";

const Viewer = ({ model, ...props }) => {
  const { url } = model;
  const [isLoading, setIsLoading] = useState(true);

  const { scene } = useMemo(() => {
    if (url.endsWith(".glb") || url.endsWith(".gltf")) {
      const { scene } = useGLTF(url);
      setIsLoading(false);
      return { scene };
    } else if (url.endsWith(".fbx")) {
      const { scene } = useFBX(url);
      setIsLoading(false);
      return { scene };
    } else if (url.endsWith(".obj")) {
      const objLoader = new OBJLoader();
      objLoader.load(
        url,
        (obj) => {
          setIsLoading(false);
          return { scene: obj };
        },
        undefined,
        (error) => console.error("Error loading OBJ:", error)
      );
    } else if (url.endsWith(".skp")) {
      // SKP file loader
      const skpLoader = new ColladaLoader();
      skpLoader.load(
        url,
        (skp) => {
          setIsLoading(false);
          return { scene: skp.scene };
        },
        undefined,
        (error) => console.error("Error loading SKP:", error)
      );
    } else {
      console.warn("Unsupported model format:", url);
      return { scene: null };
    }
  }, [url]);

  const [ref] = useBox(() => ({
    type: "Static",
    mass: 1,
    args: props.args,
    position: props.position,
    ...props,
  }));

  if (!scene) {
    return <div>Unsupported model format</div>;
  }

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <group ref={ref} {...props} dispose={null}>
          <primitive object={scene} scale={props.scale} />
        </group>
      )}
    </>
  );
};

Viewer.propTypes = {
  model: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  args: PropTypes.array,
  position: PropTypes.array,
  scale: PropTypes.array,
};

export default Viewer;
