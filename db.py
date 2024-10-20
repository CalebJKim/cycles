import singlestoredb as s2
import dotenv
import os

dotenv.load_dotenv()
user = os.getenv("SINGLE_STORE_USER")
password = os.getenv("SINGLE_STORE_PASSWORD")

conn = s2.connect(f'{user}:{password}@svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333/db_marcus_00bad')

# data = [
#   (1, "KorE"),
#   (2, "PamY"),
#   (3, "TabK"),
# ]
# 

def add_summary_data(data):
    stmt = 'INSERT INTO summaries (Cycle, Summary, Score) VALUES (%s, %s, %s)'
    with conn:
        conn.autocommit(True)
        with conn.cursor() as cur:
            cur.execute(stmt, data)


# with conn:
#     conn.autocommit(True)
#     with conn.cursor() as cur:
#         cur.execute('CREATE TABLE summaries (ID INT AUTO_INCREMENT PRIMARY KEY, Cycle INT, Summary MEDIUMTEXT, Score INT );')
