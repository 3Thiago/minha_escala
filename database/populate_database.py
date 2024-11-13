import csv

import mysql.connector

def populate_ranking_database_from_csv(csv_file_path):
    # Connect to the MySQL database
    conn = mysql.connector.connect(
        host="localhost",
        user='my_user',
        password='my_password',
        database='escala_database'
        )
    cursor = conn.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS ranking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    grad VARCHAR(255),
    avatar VARCHAR(255),
    team INT,
    responsability VARCHAR(255),
    services INT)
    ''')

    # Open the CSV file and read its contents
    with open(csv_file_path, newline='', encoding='latin1') as csvfile:  # Specify the correct encoding
        csv_reader = csv.reader(csvfile)
        headers = next(csv_reader)  # Skip the header row

        # Insert each row into the database
        for row in csv_reader:
            if len(row) != 6:
                print(f"Skipping row with incorrect number of columns: {row}")
                continue

            cursor.execute('''
            INSERT INTO ranking (name, grad, avatar, team, responsability, services)
            VALUES (%s, %s, %s, %s, %s, %s)
            ''', row)

    # Commit the transaction and close the connection
    conn.commit()
    conn.close()
    print("Database populated successfully!")


def populate_services_database_from_csv(csv_file_path):
    # Connect to the MySQL database
    conn = mysql.connector.connect(
        host="localhost",
        user='my_user',
        password='my_password',
        database='escala_database'
        )
    cursor = conn.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    today VARCHAR(255),
    user VARCHAR(255),
    avatar VARCHAR(255),
    func VARCHAR(255),
    escala VARCHAR(255),
    data VARCHAR(255))
    ''')

    # Open the CSV file and read its contents
    with open(csv_file_path, newline='', encoding='latin1') as csvfile:  # Specify the correct encoding
        csv_reader = csv.reader(csvfile)
        headers = next(csv_reader)  # Skip the header row

        # Insert each row into the database
        for row in csv_reader:
            if len(row) != 6:
                print(f"Skipping row with incorrect number of columns: {row}")
                continue
            cursor.execute('''
            INSERT INTO services (today, user, avatar, func, escala, data)
            VALUES (%s, %s, %s, %s, %s, %s)
            ''', row)

    # Commit the transaction and close the connection
    conn.commit()
    conn.close()
    print("Database populated successfully!")

# Example usage
populate_services_database_from_csv('/Users/thcorrea/Documents/estacio/escala_2024/database/escala.csv')
populate_ranking_database_from_csv('/Users/thcorrea/Documents/estacio/escala_2024/database/ranking.csv')

