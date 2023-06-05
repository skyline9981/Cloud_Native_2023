# Setup

## Check if you have installed Node.JS
```
node -v
```
if not, install first.

## Build
```
git clone [this repo]
cd [this repo]
cp .env.sample .env
yarn
pip install -r requirements.txt
docker-compose up
```
## Make sure you have changed the info in .env
## Run
```
python .\server\server.py
npx expo start
[scan the QR code]
```

## Network error troubleshoot

```
$env:REACT_NATIVE_PACKAGER_HOSTNAME = "your ip address"
```
