import singlestoredb as s2
import dotenv
import os



# data = [
#   (1, "KorE"),
#   (2, "PamY"),
#   (3, "TabK"),
# ]
# 

def add_cycle_data(sessionID, summary, score, improvement, cycle):
    dotenv.load_dotenv()
    user = os.getenv("SINGLE_STORE_USER")
    password = os.getenv("SINGLE_STORE_PASSWORD")

    conn = s2.connect(f'{user}:{password}@svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333/db_marcus_00bad')
    stmt = 'INSERT INTO cycles (Summary, Score, Improvement, Cycle, SessionID) VALUES (%s, %s, %s, %s, %s)'
    data = (summary, score, improvement, cycle, sessionID)
    print("DATA FOR CYCLE: ")
    print(data)
    with conn:
        conn.autocommit(True)
        with conn.cursor() as cur:
            cur.execute(stmt, data)
    print("ADDED A CYCLE")

def start_session():
    dotenv.load_dotenv()
    user = os.getenv("SINGLE_STORE_USER")
    password = os.getenv("SINGLE_STORE_PASSWORD")

    conn = s2.connect(f'{user}:{password}@svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333/db_marcus_00bad')
    stmt = 'INSERT INTO sessions () VALUES ()'
    id = -1
    with conn:
        conn.autocommit(True)
        with conn.cursor() as cur:
            cur.execute(stmt)
            id = cur.lastrowid
    print("STARTED A SESSION")
    return id


def add_session_data(id, summary, score, input, filepath):
    dotenv.load_dotenv()
    user = os.getenv("SINGLE_STORE_USER")
    password = os.getenv("SINGLE_STORE_PASSWORD")

    conn = s2.connect(f'{user}:{password}@svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333/db_marcus_00bad')
    stmt = 'UPDATE sessions SET Summary = %s, Score = %s, Input = %s, Filepath = %s WHERE ID = %s'
    data = (summary, score, input, filepath, id)
    with conn:
        conn.autocommit(True)
        with conn.cursor() as cur:
            cur.execute(stmt, data)
    print("UPDATED A SESSION")

def add_persona_data(id, cycle, title, score, desc, response):
    dotenv.load_dotenv()
    user = os.getenv("SINGLE_STORE_USER")
    password = os.getenv("SINGLE_STORE_PASSWORD")

    conn = s2.connect(f'{user}:{password}@svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333/db_marcus_00bad')
    stmt = 'INSERT INTO personas (session_id, cycle_id, title, score, description, response) VALUES (%s, %s, %s, %s, %s, %s)'
    data = (id, cycle, title, score, desc, response)
    with conn:
        conn.autocommit(True)
        with conn.cursor() as cur:
            cur.execute(stmt, data)
    print("ADDED A PERSONA")

def get_session_cycles(id):
    dotenv.load_dotenv()
    user = os.getenv("SINGLE_STORE_USER")
    password = os.getenv("SINGLE_STORE_PASSWORD")

    conn = s2.connect(f'{user}:{password}@svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333/db_marcus_00bad')
    query = "SELECT * FROM cycles WHERE SessionID = %s ORDER BY Cycle ASC;"
    cycles = []
    with conn:
        conn.autocommit(True)
        with conn.cursor() as cur:
            cur.execute(query, (id,))
            cycles = cur.fetchall()
    print("RETRIEVED CYCLES FROM A SESSION")
    return cycles

def get_session_personas(id):
    dotenv.load_dotenv()
    user = os.getenv("SINGLE_STORE_USER")
    password = os.getenv("SINGLE_STORE_PASSWORD")

    conn = s2.connect(f'{user}:{password}@svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333/db_marcus_00bad')
    query = "SELECT * FROM personas WHERE session_id = %s ORDER BY cycle_id DESC;"
    personas = []
    with conn:
        conn.autocommit(True)
        with conn.cursor() as cur:
            cur.execute(query, (id,))
            personas = cur.fetchall()
    print("RETRIEVED PERSONAS FROM A SESSION")
    return personas

#1125899906842628

# c = get_session_cycles(1125899906842628)
# for cyc in c:
#     print(cyc)
# my_session = start_session()
# print(my_session)
# add_cycle_data(my_session, "Dummy Cycle Summary", 10, 1)
# add_cycle_data(my_session, "Dummy Cycle Summary 2", 0, 2)
# add_session_data(my_session, "Dummy final summary", 0, "this is an input", "a filepath")

# dotenv.load_dotenv()
# user = os.getenv("SINGLE_STORE_USER")
# password = os.getenv("SINGLE_STORE_PASSWORD")

# conn = s2.connect(f'{user}:{password}@svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333/db_marcus_00bad')


# create_sessions_view = """
# CREATE VIEW sessions_view AS
# SELECT ID, Summary, Score, Input, Filepath
# FROM sessions;
# """

# create_cycles_view = """
# CREATE VIEW cycles_view AS
# SELECT ID, Summary, Score, Cycle, SessionID
# FROM cycles;
# # """

# with conn:
#     conn.autocommit(True)
#     with conn.cursor() as cur:
#         drop_table_query = """
#         DROP TABLE IF EXISTS personas;
#         """
        
#         # Execute the drop table query
#         cur.execute(drop_table_query)

#         # SQL query to recreate the 'personas' table with 'session_id' as BIGINT
#         create_table_query = """
#         CREATE TABLE personas (
#             id BIGINT AUTO_INCREMENT PRIMARY KEY,
#             session_id BIGINT NOT NULL,
#             cycle_id INT NOT NULL,
#             title VARCHAR(255),
#             score TEXT,
#             description TEXT,
#             response TEXT
#         );
#         """
        
#         # Execute the create table query
#         cur.execute(create_table_query)
