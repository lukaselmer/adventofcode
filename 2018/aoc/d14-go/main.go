package main

import "fmt"

func main() {
	fmt.Println(timeToProduce([]int{8, 2, 5, 4, 0, 1}))
}

func timeToProduce(goalRecipies []int) int {
	elfPositions := make([]int, 2)
	elfPositions[0] = 0
	elfPositions[1] = 1

	recipies := make([]int, 2)
	recipies[0] = 3
	recipies[1] = 7

	index := 0
	length := len(goalRecipies)

	for {
		elfPositions, recipies = makeRecipies(elfPositions, recipies)
		for len(recipies) >= index+length+2 {
			for offset := 0; offset < length; offset++ {
				if recipies[index+offset] != goalRecipies[offset] {
					break
				}
				if offset == length-1 {
					return index
				}
			}
			index++
		}
	}
}

func makeRecipies(elfPositions []int, recipies []int) ([]int, []int) {
	recipie := recipies[elfPositions[0]] + recipies[elfPositions[1]]
	if recipie >= 10 {
		recipies = append(recipies, 1)
	}
	recipies = append(recipies, recipie%10)

	return []int{
		(elfPositions[0] + recipies[elfPositions[0]] + 1) % len(recipies),
		(elfPositions[1] + recipies[elfPositions[1]] + 1) % len(recipies),
	}, recipies
}
