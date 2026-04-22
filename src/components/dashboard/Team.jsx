function Team() {
  const members = [
    {
      id: 1,
      name: "Sudarshan",
      role: "Frontend Developer",
      status: "Online",
      tasks: 8,
      progress: 82,
      avatar: "S",
    },
    {
      id: 2,
      name: "Arjun",
      role: "UI / UX Designer",
      status: "Busy",
      tasks: 5,
      progress: 64,
      avatar: "A",
    },
    {
      id: 3,
      name: "Meera",
      role: "Backend Developer",
      status: "Online",
      tasks: 6,
      progress: 73,
      avatar: "M",
    },
    {
      id: 4,
      name: "Kavin",
      role: "QA Tester",
      status: "Away",
      tasks: 3,
      progress: 48,
      avatar: "K",
    },
  ];

  const statusColor = {
    Online: "bg-green-500",
    Busy: "bg-red-500",
    Away: "bg-yellow-500",
  };

  return (
    <div className="flex-1 overflow-auto p-8 space-y-6">
      {/* Header */}
     <div className="mb-2">
  <p className="text-sm text-slate-500">
    Team activity overview
  </p>
</div>

      {/* Team Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-[#11192d] border border-white/5 p-6">
          <p className="text-slate-400 text-sm">
            Total Members
          </p>

          <h2 className="text-3xl font-bold text-white mt-3">
            {members.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-[#11192d] border border-white/5 p-6">
          <p className="text-slate-400 text-sm">
            Active Now
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-3">
            {
              members.filter(
                (member) =>
                  member.status === "Online"
              ).length
            }
          </h2>
        </div>

        <div className="rounded-3xl bg-[#11192d] border border-white/5 p-6">
          <p className="text-slate-400 text-sm">
            Avg Productivity
          </p>

          <h2 className="text-3xl font-bold text-violet-400 mt-3">
            67%
          </h2>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="rounded-3xl bg-[#11192d] border border-white/5 p-6 hover:-translate-y-1 hover:border-violet-400/20 transition-all duration-300"
          >
            {/* Top */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-xl font-bold text-white">
                {member.avatar}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  {member.name}
                </h2>

                <p className="text-sm text-slate-400">
                  {member.role}
                </p>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    statusColor[
                      member.status
                    ]
                  }`}
                />

                <span className="text-xs text-slate-400">
                  {member.status}
                </span>
              </div>
            </div>

            {/* Middle */}
            <div className="mt-6 flex justify-between text-sm">
              <div>
                <p className="text-slate-500">
                  Tasks
                </p>

                <p className="text-white font-semibold mt-1">
                  {member.tasks}
                </p>
              </div>

              <div className="text-right">
                <p className="text-slate-500">
                  Productivity
                </p>

                <p className="text-white font-semibold mt-1">
                  {member.progress}%
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4 w-full h-2 bg-[#1e293b] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                style={{
                  width: `${member.progress}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;