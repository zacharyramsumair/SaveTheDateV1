'use client'
import React, { useState, useEffect } from 'react';

type Props = {
  eventDate: Date | string | null;
};

const CountdownToDateAndTime: React.FC<Props> = ({ eventDate }: Props) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (eventDate) {
      const targetDate = new Date(eventDate).getTime();

      const updateCountdown = () => {
        const now = new Date().getTime();
        const timeDifference = targetDate - now;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      };

      // Update the countdown every second
      const countdownInterval = setInterval(updateCountdown, 1000);

      // Clear the interval when the component unmounts
      return () => clearInterval(countdownInterval);

      // Initial update
      updateCountdown();
    }
  }, [eventDate]);

  return (
    <div className="flex gap-2 justify-center">
      <CountdownCard title="Days" value={countdown.days} />
      <CountdownCard title="Hours" value={countdown.hours} />
      <CountdownCard title="Minutes" value={countdown.minutes} />
      <CountdownCard title="Seconds" value={countdown.seconds} />
    </div>
  );
};

type CountdownCardProps = {
  title: string;
  value: number;
};

const CountdownCard: React.FC<CountdownCardProps> = ({ title, value }: CountdownCardProps) => (
  <div className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md flex-shrink-0  justify-center">
    <p className="text-lg md:text-3xl lg:text-5xl font-semibold text-black dark:text-white">{value}</p>
    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">{title}</p>
  </div>
);

export default CountdownToDateAndTime;
