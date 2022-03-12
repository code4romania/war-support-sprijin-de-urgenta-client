# -*- coding: utf-8 -*-
#
# Based on:
# https://code.google.com/p/gource/wiki/GravatarExample
# https://gist.github.com/macagua/5c2f5e4e38df92aae7fe
#
# Usage with Gource: gource --user-image-dir .git/avatar/
#
# Get list of authors + email with hg log (todo)
# hg log --template '{author}\n'
#

import os
import requests
import subprocess
import hashlib


def md5_hex(text):
    m = hashlib.md5()
    m.update(text.encode('ascii', errors='ignore'))
    return m.hexdigest()

size = 90
# Configure the path of the git project
projectpath = "/Users/massimo/Documents/FabAcademy2015/europe"
hgpath = os.path.join(projectpath, '.hg')
output_dir = os.path.join(hgpath, 'avatar')

# Create the folder for storing the images. It's in the .git folder, so it won't be tracked by git
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

hglog = subprocess.check_output(["hg", "log", "--template","'{author}\n'"], cwd=projectpath)
authors = set(hglog.decode('ascii', errors='ignore').splitlines())
print(authors)
print("")
for author in authors:
    author = author.replace("''", "")
    if "<" in author:
        name, email = author.split('<')
        email = email.replace(">", "")
        print(name, email)
        if name[-1] == " ":
            name = name[:-1]
    else:
        name = author
        email = ""
    output_file = os.path.join(output_dir, name + '.png')
    if not os.path.exists(output_file):
        grav_url = "http://www.gravatar.com/avatar/" + md5_hex(email) + "?d=identicon&s=" + str(size)
        print(grav_url)
        print("")
        r = requests.get(grav_url)
        if r.ok:
            with open(output_file, 'wb') as img:
                img.write(r.content)
