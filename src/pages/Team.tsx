import { motion } from "framer-motion";
import { Globe, Mail, Palette } from "lucide-react";
import productsData from "../data/products.json";

export default function Team() {
  return (
    <div className="px-4 py-6 pb-12 sm:px-6 md:px-8">
      <div className="rounded-[40px] bg-gradient-to-br from-gray-100 to-gray-200 p-8 text-center sm:p-12 md:p-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold text-gray-900 sm:text-4xl md:text-5xl"
        >
          Meet Our Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-gray-600"
        >
          Our talented team designs luxurious minimalist furniture, blending
          form and function to create pieces that elevate every space.
        </motion.p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {productsData.team.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="group overflow-hidden rounded-[32px] border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={member.avatar}
                alt={member.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 backdrop-blur-sm">
                  <Globe className="h-4 w-4" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 backdrop-blur-sm">
                  <Mail className="h-4 w-4" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 backdrop-blur-sm">
                  <Palette className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 rounded-[32px] border border-gray-100 bg-white p-8 text-center shadow-sm"
      >
        <h3 className="text-xl font-semibold text-gray-900">
          Want to join the team?
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          We're always looking for talented people to help us shape the future
          of furniture design.
        </p>
        <button className="mt-5 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white">
          View open positions
        </button>
      </motion.div>
    </div>
  );
}
