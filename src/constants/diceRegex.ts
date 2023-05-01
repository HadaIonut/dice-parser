export const ALL_TYPES_OF_DICE_REGEX = /(?:\d+d\d+)(?:rr|r|xo|x|kh|kl|dh|dl|k|d|sf|min|max|even|odd|cs|cf)?(?:>=|<=|>|<|=)?(\d)*(df|x)?(>=|<=|>|<|=)?(\d+)?(kh|kl|dh|dl|k|d)?/gim
export const REROLL_DICE_REGEX = /^(\d+)d(\d+)(rr|r)(>=|<=|>|<)?(\d+)$/gim
export const EXPLODING_DICE_REGEX = /^(\d+)d(\d+)(x<|x>|xo|x)(\d+)(kh|kl|dh|dl|k|d|min|max)?(\d+)?$/gim
export const COUNT_DICE_REGEX = /^(\d+)d(\d+)(cs|cf|even|odd)(>=|<=|>|<|=)?(\d+)?(df|x)?(>=|<=|>|<|=)?(\d+)?$/gim
export const CONDITIONAL_SUBTRACT_REGEX = /^(\d+)d(\d+)(sf)(>=|<=|>|<|=)?(\d+)$/gim
export const STANDARD_DICE_REGEX = /^(\d+)d(\d+)(kh|kl|dh|dl|k|d|min|max|)?(\d+)?$/gim

export const INLINE_EXPRESSION_REGEX = /\[\[([^\]]*)]]/gim