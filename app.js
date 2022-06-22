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
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0) {
        alert("monster has defeated you...");
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        alert("You defeated the monster!");
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
  },
  methods: {
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.specialAttackValue += 1;
      this.attackPlayer();
    },
    specialAttackMonster() {
      if (this.specialAttackValue >= 5) {
        const attackValue = getRandomValue(20, 35);
        this.monsterHealth -= attackValue;
        this.specialAttackValue = 0;
        this.attackPlayer();
      }
    },
    healPlayer() {
      const healValue = getRandomValue(12, 18);
      this.playerHealth += healValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    },
  },
});

app.mount("#game");
