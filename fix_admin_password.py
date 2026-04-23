import psycopg2

conn = psycopg2.connect(host='localhost', dbname='examsphere', user='postgres', password='9326')
cur = conn.cursor()

# Update admin password with valid BCrypt hash and fix role prefix
cur.execute("UPDATE users SET password = %s, role = %s WHERE email = %s", 
    ('$2b$10$n9RQvYMxaKTdOr0g/27U.OZlqBCI3UF9oLuwXr21EweqXOh9UqzQG', 'ADMIN', 'admin@examsphere.com'))
conn.commit()

cur.execute('SELECT id, email, role, password FROM users WHERE email = %s', ('admin@examsphere.com',))
row = cur.fetchone()
print('Updated admin:', row)

cur.close()
conn.close()

