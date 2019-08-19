const recipes = {
  sticks: {
    name: 'Sticks',
    key: 'sticks',
    cost: {
      wood: 1,
    },
    craftDurationSeconds: 2,
    amount: 2,
  },
  planks: {
    name: 'Planks',
    key: 'planks',
    cost: {
      wood: 1,
    },
    craftDurationSeconds: 2,
    amount: 1,
  },
  sharp_stone: {
    name: 'Sharp Stone',
    key: 'sharp_stone',
    cost: {
      stone: 2,
    },
    craftDurationSeconds: 4,
    amount: 1,
  },
  stone_axe: {
    name: 'Stone Axe',
    key: 'stone_axe',
    cost: {
      sticks: 3,
      sharp_stone: 2,
    },
    craftDurationSeconds: 4,
    amount: 1,
  },
  stone_pickaxe: {
    name: 'Stone Pickaxe',
    key: 'stone_pickaxe',
    cost: {
      sticks: 2,
      stone: 1,
      sharp_stone: 2,
    },
    craftDurationSeconds: 4,
    amount: 1,
  },
}

export default recipes
