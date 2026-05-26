import unittest
from unittest.mock import patch

from app import database


class DatabaseTest(unittest.TestCase):
    def test_get_connection_exige_database_url(self):
        with patch.object(database, "DATABASE_URL", None):
            with self.assertRaisesRegex(RuntimeError, "DATABASE_URL"):
                database.get_connection()

    def test_get_connection_usa_psycopg(self):
        with (
            patch.object(database, "DATABASE_URL", "postgresql://teste"),
            patch("app.database.psycopg.connect", return_value="conn") as connect,
        ):
            self.assertEqual(database.get_connection(), "conn")

        connect.assert_called_once_with("postgresql://teste")


if __name__ == "__main__":
    unittest.main()
