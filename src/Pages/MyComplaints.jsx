import React, { useState, useEffect } from "react";

const MyComplaints = () => {
  const [filter, setFilter] = useState("All");
  const [complaintsData, setComplaintsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch complaints from your backend (MongoDB)
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch("http://civix-sqp4.onrender.com:5000/api/issues");
        if (!res.ok) throw new Error("Failed to fetch complaints");
        const data = await res.json();
        setComplaintsData(data.reverse()); // newest first
      } catch (error) {
        console.error("❌ Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "bg-gradient-to-r from-amber-200/70 to-orange-100/70 text-amber-700 border border-amber-300";
      case "in progress":
        return "bg-gradient-to-r from-blue-200/70 to-cyan-100/70 text-blue-700 border border-cyan-300";
      case "resolved":
        return "bg-gradient-to-r from-emerald-200/70 to-green-100/70 text-emerald-700 border border-emerald-300";
      default:
        return "bg-gradient-to-r from-gray-200/70 to-slate-100/70 text-gray-700 border border-slate-300";
    }
  };

  const filteredComplaints =
    filter === "All"
      ? complaintsData
      : complaintsData.filter((c) => c.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-slate-100 dark:from-gray-900 dark:via-emerald-950 dark:to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-80 h-80 rounded-full bg-emerald-300/10 blur-2xl" />
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-green-400/10 blur-2xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 py-8 lg:px-12">
        <button
          className="fixed top-7 left-7 z-30 group flex items-center gap-2.5 px-4 py-2.5 text-emerald-700 dark:text-emerald-200 hover:text-emerald-900 dark:hover:text-emerald-100 transition hover:bg-white/80 hover:shadow-lg rounded-xl border border-white/40 shadow backdrop-blur"
          onClick={() => window.history.back()}
          type="button"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </button>

        <div className="max-w-5xl mx-auto pt-20">
          <div className="mb-14 text-center">
            <div className="inline-block px-10 py-8 rounded-3xl bg-white/60 dark:bg-emerald-950/50 border border-white/30 dark:border-emerald-800/60 shadow-2xl backdrop-blur-xl relative">
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-700 via-green-600 to-teal-500 bg-clip-text text-transparent mb-2 tracking-tight">
                My Complaints
              </h1>
              <p className="text-emerald-600/90 dark:text-emerald-400/90 text-lg font-semibold">
                Track your submitted complaints and their progress
              </p>
              <span className="block absolute left-1/2 -translate-x-1/2 -bottom-2 h-1 w-14 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
            </div>
          </div>

          {/* Filter dropdown */}
          <div className="flex justify-end mb-8">
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 text-emerald-700 dark:text-emerald-300 bg-white/70 dark:bg-emerald-950/70 border border-emerald-200/40 dark:border-emerald-900/60 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition font-medium"
              >
                <option value="All">All Complaints</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Display complaints */}
          {loading ? (
            <p className="text-center text-gray-500 text-lg">Loading complaints...</p>
          ) : filteredComplaints.length === 0 ? (
            <div className="text-center py-24">
              <h3 className="text-2xl font-bold text-emerald-800 mb-2">No complaints found</h3>
              <p className="text-emerald-500/80 text-lg">Try submitting a new complaint.</p>
            </div>
          ) : (
            <div className="grid gap-7">
              {filteredComplaints.map((c, i) => (
                <div
                  key={c._id || i}
                  className="group relative bg-white/80 dark:bg-emerald-950/80 border border-emerald-200/40 dark:border-emerald-800/50 shadow-xl hover:shadow-2xl rounded-3xl p-8 transition duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-300">
                      <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="font-semibold text-lg">
                        {formatDate(c.createdAt)}
                      </span>
                    </div>
                    <span className={`px-4 py-2 min-w-[120px] rounded-2xl text-base font-semibold shadow ${getStatusColor(c.status)}`}>
                      {c.status || "Pending"}
                    </span>
                  </div>

                  <p className="text-gray-800 dark:text-emerald-100 text-xl leading-relaxed mb-4 font-medium">
                    {c.title || c.complaint}
                  </p>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {c.description || "No description available."}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-5 mt-2 border-t border-emerald-100/40 dark:border-emerald-700/40 gap-4">
                    <span className="text-base font-medium text-emerald-500">
                      Location: {c.location || "Unknown"}
                    </span>
                    <span className="text-base font-medium text-emerald-600 dark:text-emerald-300">
                      Complaint #{i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyComplaints;
