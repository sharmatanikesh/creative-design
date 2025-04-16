import { useState, useEffect } from "react";

export const Countdown = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setTime({
      days: 7,
      hours: 12,
      minutes: 45,
      seconds: 30,
    });
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newTime = { ...prevTime };

        newTime.seconds -= 1;
        if (newTime.seconds < 0) {
          newTime.seconds = 59;
          newTime.minutes -= 1;

          if (newTime.minutes < 0) {
            newTime.minutes = 59;
            newTime.hours -= 1;

            if (newTime.hours < 0) {
              newTime.hours = 23;
              newTime.days -= 1;
            }
          }
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]);

  return (
    <div className="flex justify-center gap-6">
      {Object.entries(time).map(([unit, value]) => (
        <div key={unit} className="bg-black bg-opacity-50 p-4 pixelated">
          <div className="text-2xl font-pixel text-yellow-300">
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-xs text-gray-300">{unit.toUpperCase()}</div>
        </div>
      ))}
    </div>
  );
};
