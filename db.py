import db as s2
import dotenv
import os

dotenv.load_dotenv()
user = os.getenv("SINGLE_STORE_USER")
password = os.getenv("SINGLE_STORE_PASSWORD")

conn = s2.connect(f'{user}:{password}@svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333/db_marcus_00bad')

data = [
  (1, "KorE"),
  (2, "PamY"),
  (3, "TabK"),
]
stmt = 'INSERT INTO testID (ID, Code) VALUES (%s, %s)'

with conn:
    conn.autocommit(True)
    with conn.cursor() as cur:
        cur.execute('CREATE TABLE testID (ID INT PRIMARY KEY, Code VARCHAR(4));')
        cur.executemany(stmt, data)
