# Jarvis Project

To run the project, you need to have Python installed and every dependency on the requirements.txt

`pip install -r ./requirements.txt`

Then you need to create a .env file with your variables:

```
OWNER=YOUR_NAME
BOTNAME=JARVIS
EMAIL=YOUR_EMAIL_ADDRESS
PASSWORD=YOUR_EMAIL_PASS
```

Also change the paths on functions.py to open your programs correctly. If for some reason they are not opening, you can try replacing the sp.Popen for os.startfile(path).

Then run the script: \
` python jarvis.py`
