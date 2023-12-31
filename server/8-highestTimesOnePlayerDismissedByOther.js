const problem8 = (db) => {
  return db
    .select("bowler", "player", "number")
    .from(function () {
      this.select("bowler", "player_dismissed as player")
        .count("* as number")
        .denseRank("ranking", db.raw(`order by count(*) desc`))
        .from(`deliveries`)
        .groupBy("bowler", "player_dismissed")
        .where("player_dismissed", "!=", "")
        .andWhere("dismissal_kind", "!=", "run out")
        .as("temp");
    })
    .where(`ranking`, "=", "1");
};

module.exports.problem8 = problem8;
