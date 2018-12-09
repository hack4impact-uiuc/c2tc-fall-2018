import csv
import os

dic = {}

with open("header.csv") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=",")
    for row in csv_reader:
        if row[0] not in dic:
            dic[row[0]] = row[1]


def check_filter(id):
    if id not in dic:
        return 30
    else:
        return dic[id]
