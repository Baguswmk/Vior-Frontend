import { useState, useEffect } from "react";
import nipplejs from "nipplejs";
import Hammer from "hammerjs";

export const usePlayerControls = () => {
  const keys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right", Space: "jump" };
  const moveFieldByKey = (key) => keys[key];

  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, jump: false });
  const [cameraMovement, setCameraMovement] = useState({ x: 0, y: 0 });

  const sensitivity = 0.25;

  useEffect(() => {
    const handleKeyDown = (e) => {
      const move = moveFieldByKey(e.code);
      if (move) setMovement((m) => ({ ...m, [move]: true }));
    };
    const handleKeyUp = (e) => {
      const move = moveFieldByKey(e.code);
      if (move) setMovement((m) => ({ ...m, [move]: false }));
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let joystickManager = null;
    let hammerManager = null;

    if (window.innerWidth < 800) {
      joystickManager = nipplejs.create({
        zone: document.getElementById("joystick"),
        mode: "static",
        position: { left: "50%", top: "50%" },
        color: "red",
      });

      joystickManager.on("move", (evt, data) => {
        const { angle } = data;
        const degree = angle.degree;
        setMovement({
          forward: degree > 45 && degree < 135,
          backward: degree > 225 && degree < 315,
          right: degree > 315 || degree < 45,
          left: degree > 135 && degree < 225,
          jump: false,
        });
      });

      joystickManager.on("end", () => {
        setMovement({ forward: false, backward: false, left: false, right: false, jump: false });
      });

      const element = document.getElementById("touchscreen");
      hammerManager = new Hammer(element);

      hammerManager.get("pan").set({ direction: Hammer.DIRECTION_ALL });

      hammerManager.on("pan", (ev) => {
        setCameraMovement({ x: ev.deltaX * sensitivity, y: ev.deltaY * sensitivity });
      });

      hammerManager.on("panend", () => {
        setCameraMovement({ x: 0, y: 0 });
      });
    }

    return () => {
      if (joystickManager) {
        joystickManager.destroy();
      }
      if (hammerManager) {
        hammerManager.destroy();
      }
    };
  }, []);

  return { movement, cameraMovement };
};
