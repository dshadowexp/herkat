from typing import List
        
def findOccurencesAndSwap(c1, c2, word):
    result = []
    for letter in word:
        if letter == c1:
            result.append(c2)
        elif letter == c2:
            result.append(c1)
        else:
            result.append(letter)
    return ''.join(result)

def findLexicographicallyGreatestString(strList: str) -> List[str]:
    results = []
    for word in strList:
        for letter in word:
            char_to_swap = ''
            for i in range(ord('z'), ord('a'), -1):
                if i > ord(letter):
                    char_to_swap = chr(i)
                    break
                if i == ord(letter):
                    break
            if char_to_swap:
                swapped = findOccurencesAndSwap(letter, char_to_swap, word)
                if swapped > word:
                    results.append(swapped)
                else: 
                    results.append(word)
                break
        print(results)
    return results

findLexicographicallyGreatestString(['w', 'moo', 'wz', 'zzzze'])
