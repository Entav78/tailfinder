/**
 * A mapping of species to their common aliases.
 *
 * @remarks
 * Currently only includes aliases for "snake" and "spider" to support filtering logic.
 * Other species are intentionally excluded to avoid unintended matches.
 */
export const speciesAliasMap: Record<string, string[]> = {
  snake: [
    'snake',
    'anaconda',
    'python',
    'boa',
    'viper',
    'cobra',
    'adder',
    'serpent',
  ],
  spider: ['spider', 'tarantula', 'arachnid', 'black widow', 'wolf spider'],
};
