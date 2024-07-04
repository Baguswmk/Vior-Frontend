// Controller/Controller.js
import { useState, useEffect } from "react";
import nipplejs from "nipplejs";

export const usePlayerControls = () => {
  const keys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right", Space: "jump" };
  const moveFieldByKey = (key) => keys[key];

  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, jump: false });

  useEffect(() => {
    const handleKeyDown = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
    const handleKeyUp = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let manager = null;

    if (window.innerWidth < 800) {
      // Setup nipplejs for joystick control
      manager = nipplejs.create({
        zone: document.getElementById("joystick"),
        mode: "static",
        position: { left: "50%", top: "50%" },
        color: "red",
      });

      manager.on("move", (evt, data) => {
        const { angle, distance } = data;
        // Adjust movement based on joystick angle and distance
        // Implement your movement logic here based on angle and distance
      });
    }

    return () => {
      if (manager) {
        manager.destroy();
      }
    };
  }, []);

  return movement;
};
