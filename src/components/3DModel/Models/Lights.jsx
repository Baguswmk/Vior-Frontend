const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight intensity={3} position={[2, 5, -5]} castShadow />
    </>
  );
};

export default Lights;
