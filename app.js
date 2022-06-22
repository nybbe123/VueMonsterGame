const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      specialAttackValue: 0,
      battleLogs: [],
      logMessage: "",
      gameOverStatus: "",
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0) {
        this.gameOverStatus = "Monster defeated you...";
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        this.gameOverStatus = "You defeated monster!";
      }
    },
  },
  computed: {
    monsterBarStyles() {
      return { width: `${this.monsterHealth}%` };
    },
    playerBarStyles() {
      return { width: `${this.playerHealth}%` };
    },
    specialAttackClass() {
      return { inactive: this.specialAttackValue < 5 };
    },
  },
  methods: {
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.specialAttackValue += 1;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    specialAttackMonster() {
      if (this.specialAttackValue >= 5) {
        const attackValue = getRandomValue(10, 25);
        this.monsterHealth -= attackValue;
        this.specialAttackValue = 0;
        this.addLogMessage("monster", "attack", attackValue);
        this.attackPlayer();
      }
    },
    healPlayer() {
      const healValue = getRandomValue(8, 24);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    surrender() {
      this.playerHealth = 0;
    },
    resetGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.specialAttackValue = 0;
      this.battleLogs = [];
      this.gameOverStatus = "";
    },
    addLogMessage(who, what, value) {
      this.battleLogs.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
