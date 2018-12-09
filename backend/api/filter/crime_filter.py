import csv
import os

important_crime = {}

with open("header.csv") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=",")
    for row in csv_reader:
        if row[0] not in important_crime:
            important_crime[row[0]] = row[1]


def check_filter(id):
    if id not in important_crime:
        return 30
    else:
        return important_crime[id]
