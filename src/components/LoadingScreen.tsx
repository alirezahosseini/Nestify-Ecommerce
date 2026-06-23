import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

export default function LoadingScreen({
  isLoading,
  onLoadingComplete,
}: LoadingScreenProps) {
  const bagRef = useRef<SVGSVGElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(onLoadingComplete, 400);
        },
      });

      tl.to(
        fillRef.current,
        {
          height: "100%",
          duration: 2,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        progressRef.current,
        {
          width: "100%",
          duration: 2,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        percentRef.current,
        {
          innerText: 100,
          duration: 2,
          ease: "power2.inOut",
          snap: { innerText: 1 },
          onUpdate: function () {
            if (percentRef.current) {
              percentRef.current.innerText = Math.round(
                Number(percentRef.current.innerText)
              ).toString();
            }
          },
        },
        0
      );

      tl.to(bagRef.current, {
        y: -12,
        duration: 0.4,
        yoyo: true,
        repeat: 3,
        ease: "power1.inOut",
      }, 0.2);

      tl.to(bagRef.current, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      }, 1.8);
    });

    return () => ctx.revert();
  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f5f5f5]"
        >
          <div className="relative flex flex-col items-center">
            {/* Shopping bag SVG */}
            <div className="relative mb-8">
              <svg
                ref={bagRef}
                width="120"
                height="140"
                viewBox="0 0 120 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
              >
                {/* Bag body outline */}
                <path
                  d="M10 40C10 34.4772 14.4772 30 20 30H100C105.523 30 110 34.4772 110 40V120C110 125.523 105.523 130 100 130H20C14.4772 130 10 125.523 10 120V40Z"
                  stroke="#1f2937"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Handle */}
                <path
                  d="M35 30V20C35 11.7157 41.7157 5 50 5H70C78.2843 5 85 11.7157 85 20V30"
                  stroke="#1f2937"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Detail lines */}
                <path
                  d="M35 55L50 85L35 105"
                  stroke="#1f2937"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
                />
                <path
                  d="M85 55L70 85L85 105"
                  stroke="#1f2937"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
                />
              </svg>

              {/* Liquid fill inside bag */}
              <div className="absolute bottom-[9px] left-[11px] right-[11px] top-[31px] overflow-hidden rounded-b-[24px]">
                <div
                  ref={fillRef}
                  className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-gray-900 to-gray-600"
                  style={{ borderRadius: "0 0 22px 22px" }}
                />
              </div>

              {/* Shine overlay */}
              <div className="pointer-events-none absolute bottom-[9px] left-[11px] right-[11px] top-[31px] rounded-b-[24px] bg-gradient-to-br from-white/20 to-transparent" />
            </div>

            {/* Brand text */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 text-2xl font-semibold tracking-tight text-gray-900"
            >
              Nestify
            </motion.h2>

            {/* Progress bar */}
            <div className="w-56 overflow-hidden rounded-full bg-gray-200">
              <div
                ref={progressRef}
                className="h-1.5 w-0 rounded-full bg-gray-900"
              />
            </div>

            {/* Percentage */}
            <div className="mt-3 text-sm font-medium text-gray-500">
              <span ref={percentRef}>0</span>%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
