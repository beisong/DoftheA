kill -9 `ps ax | grep node | grep meteor | grep 3000| awk '{print $1}'`
