# Object Value Updator
Simple NodeJS program that made to update current exist JSON value from other JSON, by the same key without corrupting keys.

## Example
source.json:

```json
{
    "ApplicationName": "Test App",
    "Version": "1.0.0",
    "Data": {
        "SomeValue1": 1,
        "SomeValue2": 2,
        "Nested": {
            "SomeValue3": 3
        }
    }
}
```

input.json:

```json
{
    "ApplicationName": "My App",
    "Version": "2.0.0",
    "Data": {
        "SomeValue1": 1,
        "SomeValue2": 2,
        "Nested": {
            "SomeValue3": 3,
            "NoneExists1": 4
        },
        "NoneExists2": 5
    }
}
```

Run

```
$ node update -s source.json -i input.json
```

After source.json:

```json
{
    "ApplicationName": "My App",
    "Version": "2.0.0",
    "Data": {
        "SomeValue1": 10,
        "SomeValue2": 20,
        "Nested": {
            "SomeValue3": 30
        }
    }
}
```

## Getting Started
Program wrote by Node.js 14.12.0. If you have any problem with different version, please update your Node version atleast to 14.0.0. NVM is a great tool without override your current Node.js.

1. Get Node.js

2. Install Deps
```
$ npm install
```

3. Prepare your JSON and Run
```
$ node update -s source.json -i input.json
```

If the program found that the key only exists in input.json, will give warning message:

```
Warning: Key NoneExists1 only exists in input JSON
Warning: Key NoneExists2 only exists in input JSON
```

## Available Parameters

```
-s: Specify source JSON path. Must be specified.
-i: Specify input JSON path. Must be specified.
```

# License
MIT. Do whatever you want. You can feel free to make PR if you want to improve or fixed a bug.

# Buy me a coffee!
You can buy me a coffee if you liked this!

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PVXTU5FJNBLDS)
