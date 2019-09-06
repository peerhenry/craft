const recipes = {
  sticks: {
    itemKey: 'sticks',
    cost: {
      wood: 1,
    },
    craftDurationSeconds: 2,
    amount: 2,
    effect: {
      nourishment: -2,
      xp: 1,
    },
  },
  planks: {
    itemKey: 'planks',
    cost: {
      wood: 1,
    },
    craftDurationSeconds: 2,
    amount: 1,
    effect: {
      nourishment: -5,
      xp: 1,
    },
  },
  sharp_stone: {
    itemKey: 'sharp_stone',
    cost: {
      stone: 2,
    },
    craftDurationSeconds: 4,
    amount: 1,
    effect: {
      nourishment: -2,
      xp: 1,
    },
  },
  stone_axe: {
    itemKey: 'stone_axe',
    cost: {
      sticks: 3,
      sharp_stone: 2,
    },
    craftDurationSeconds: 4,
    amount: 1,
    effect: {
      nourishment: -5,
      xp: 4,
    },
  },
  stone_pickaxe: {
    itemKey: 'stone_pickaxe',
    cost: {
      sticks: 2,
      stone: 1,
      sharp_stone: 2,
    },
    craftDurationSeconds: 4,
    amount: 1,
    effect: {
      nourishment: -5,
      xp: 4,
    },
  },
}

export default recipes
