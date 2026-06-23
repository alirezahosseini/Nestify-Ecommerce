import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Edit3,
} from "lucide-react";

const menuItems = [
  { icon: User, label: "Personal Info", value: "Candice Wu" },
  { icon: MapPin, label: "Addresses", value: "2 saved" },
  { icon: CreditCard, label: "Payment Methods", value: "3 cards" },
  { icon: Bell, label: "Notifications", value: "On" },
  { icon: Shield, label: "Security", value: "Strong" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="px-4 py-6 pb-12 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
        Profile
      </h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm lg:col-span-1"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face"
                alt="Candice Wu"
                className="h-28 w-28 rounded-full object-cover"
              />
              <button className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg">
                <Edit3 className="h-3.5 w-3.5" />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Candice Wu
            </h2>
            <p className="text-sm text-gray-500">Creative Director</p>
            <p className="mt-1 text-sm text-gray-400">
              candice@nestify.design
            </p>

            <div className="mt-6 flex w-full gap-3">
              <div className="flex-1 rounded-2xl bg-gray-50 p-3">
                <p className="text-lg font-semibold text-gray-900">24</p>
                <p className="text-xs text-gray-500">Orders</p>
              </div>
              <div className="flex-1 rounded-2xl bg-gray-50 p-3">
                <p className="text-lg font-semibold text-gray-900">12</p>
                <p className="text-xs text-gray-500">Reviews</p>
              </div>
              <div className="flex-1 rounded-2xl bg-gray-50 p-3">
                <p className="text-lg font-semibold text-gray-900">5</p>
                <p className="text-xs text-gray-500">Wishlist</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <div className="mb-6 flex gap-2">
            {["profile", "orders", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-gray-900 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "profile" && (
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className="flex w-full items-center justify-between rounded-2xl p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500">{item.value}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                );
              })}
              <button className="mt-2 flex w-full items-center gap-3 rounded-2xl p-4 text-rose-500 transition-colors hover:bg-rose-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50">
                  <LogOut className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Log out</span>
              </button>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-3">
              {[
                { id: "#NE-2024-001", status: "Delivered", total: "$508" },
                { id: "#NE-2024-002", status: "In transit", total: "$329" },
                { id: "#NE-2024-003", status: "Processing", total: "$899" },
              ].map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order.id}
                    </p>
                    <p className="text-xs text-gray-500">{order.status}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {order.total}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Candice Wu"
                  className="mt-1 h-11 w-full rounded-xl border border-gray-100 bg-gray-50 px-4 text-sm text-gray-900 outline-none focus:border-gray-300"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="candice@nestify.design"
                  className="mt-1 h-11 w-full rounded-xl border border-gray-100 bg-gray-50 px-4 text-sm text-gray-900 outline-none focus:border-gray-300"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="mt-1 h-11 w-full rounded-xl border border-gray-100 bg-gray-50 px-4 text-sm text-gray-900 outline-none focus:border-gray-300"
                />
              </div>
              <button className="mt-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white">
                Save changes
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
