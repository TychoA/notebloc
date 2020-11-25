import sqlite3

class Database(object):

    def __init__(self):
        self._connection = sqlite3.connect("notebloc.db")
        self._cursor = self._connection.cursor()

    def add_note(self, name, note):
        self._cursor.execute("INSERT INTO notes VALUES (?, ?)", (name, note))

    def set_note(self, id, name, note):
        self._cursor.execute("UPDATE notes SET name = ?, note = ? WHERE rowid = ?", (name, note, id))

    def delete_note(self, id):
        self._cursor.execute("DELETE FROM notes WHERE rowid = ?", (id,))

    def get_note(self, id):
        return self._cursor.execute("SELECT name, note FROM notes WHERE rowid = ?", (id, )).fetchall()

    def get_notes(self):
        return self._cursor.execute("SELECT rowid, name, note FROM notes").fetchall()

if __name__ == "__main__":

    # create the table for the first time
    connection = sqlite3.connect("notebloc.db")
    cursor = connection.cursor()
    cursor.execute("DROP TABLE notes")
    cursor.execute("CREATE TABLE notes (name TEXT, note TEXT)")
