

text = "2022-07-30T12:26:17.000Z"

spl = text.split(".")
print(spl)

spl2 = spl[0].split("T")
print(spl2)
print(spl2[0])

spl3 = spl2[1].split(":")
print(spl3)

spl4 = spl3[0] + ":" + spl3[1] + " BST"
print(spl4)

spl5 = spl2[0] + " " + spl4
print(spl5)


date = text.split("T")
print(date[0])
