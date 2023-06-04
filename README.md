# Dice Parser

This dice parsing library is indented to be the final dice parsing library.

It supports everything you need for rolling any kind of dice.

Fundamentally there are 2 ways of parsing dice
1. Having an expression in the middle of a text
    - `parse("HI! I will roll [[2d6 + 1d5dl1]]")`
2. Having it in a "command" format
   - `parse("/r 1d8 + 2d20")`

Function return:

```typescript
ParseResultType = {
    original: string, //original text
    parsed: string, // text with all detected rolls replaced with the rolled values
    wasSuccessful: boolean,
    results: ParsedDiceResultType[], // an array of the result of all detected rolls
}

ParsedDiceResultType = {
  m: string, // roll expression
  start: number, // start index in text
  end: number, // end index in text
  rolls: number[], // all rolled dice, inlcuding anything that is rerolled
  rollsUsed?: number[], // in case of rerolls this field contains the rolls that were actually used
  successes?: number, // for dice counting this field contains the number of success
  fails?: number, // for dice counting this field contains the number of failures
  result: number, // in case of normal/reroll/exploding rolls this contains the sum of usefull rolls
   // in case of dice counting it has number of success or failures (depending on what is counting)
}
```


Any dice roll supports a large number of modifiers

## Keep/Drop

### Keep
- `4d6k` || `4d6kh` will roll 4 six sided dice and keep the highest one
- `4d6k3` || `4d6kh3` will roll 4 six sided dice and keep the highest three
- `4d6kl` will roll 4 six sided dice and keep the lowest one
- `4d6kl3` will roll 4 six sided dice and keep the lowest three

### Drop

- `4d6d` || `4d6dl` will roll 4 six sided dice and drop the lowest one (so it will sum the highest three)
- `4d6d2` || `4d6dl2` will roll 4 six sided dice and drop the lowest two (so it will sum the highest two)
- `4d6dh` will roll 4 six sided dice and drop the highest one (so it will sum the lowest three)
- `4d6dh2` will roll 4 six sided dice and drop the highest two (so it will sum the lowest two)

### Min/Max

- `4d6min2` will roll 4 six sided dice and replace any roll smaller than 2 with 2
- `4d6max5` will roll 4 six sided dice and replace any roll greater than 5 with 5

## Rerolls

### Normal rerolls

- `10d6r1` will roll 10 six sided dice and will roll again for any dice that rolled a 1
- `10d6r<4` will roll 10 six sided dice and will roll again for any dice that rolled lower then 4

### Recursive rerolls

- `4d6rr<3` will roll 4 six sided dice and will keep re-rolling any dice that rolled under a 3 until they are above the target

## Exploding dice

- `5d10x10` will roll 5 ten sided dice and if any of the dice is a 10 then one more dice will be rolled. If the result is a 10 again, one more dice will be rolled (theoretically infinitely)
- `5d10x<5` will roll 5 ten sided dice and if any of the dice is less than 5 then one more dice will be rolled. If the result is less than 5 again, one more dice will be rolled (theoretically infinitely)
- `5d10x>5` will roll 5 ten sided dice and if any of the dice is greater than 5 then one more dice will be rolled. If the result is greater than 5 again, one more dice will be rolled (theoretically infinitely)
- `5d10xo5` will roll 5 ten sided dice and if any of the dice is a 5 then one more dice will be rolled.

## Counting Dice

For some systems there is a need for counting the number of successes and failures. For this you have to define what is a success and what is a failure.

Count success is represented by `cs`. The format for dice counting is `(diceRoll)'cs'(comparison)?(targetNumber)`
Example:
- `4d6cs<2` will roll 4 six sided dice and count anything bellow a 2 a success

You can also define a "roll difficulty", a roll difficulty will add a target that is subtracted from the number of successes
- `5d10cs>=6df=1` will roll 5 ten sided dice count a success anything above a 6 and subtract from the result anything equal to 1

In addition, you can explode and count at the same time 
- `5d10cs>=8x=10` will roll 5 ten sided dice, count a success anything above an 8 and if a 10 is rolled, another d10 will be rolled (not recursive)

Count failure is represented by `cf`. The format is the same as for count success

### Even/Odd

In addition to this you can count even rolls or odd rolls as a success
- `4d6even` will roll 4 six sided dice and count any even roll as a success
- `4d6odd` will roll 4 six sided dice and count any odd roll as a success