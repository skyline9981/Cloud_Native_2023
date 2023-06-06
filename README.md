# Setup

## Check if you have installed Node.JS
```
node -v
```
if not, install first.

## Build
```
git clone https://github.com/skyline9981/Cloud_Native_2023.git
cd Cloud_Native_2023
cp .env.sample .env
yarn
pip install -r requirements.txt
docker-compose up -d
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
