start:
		bundle exec bridgetown start

deploy: build
		rsync -uvcr --delete output/ $TARGET

build: clean
		bundle exec bridgetown frontend:build
		bundle exec bridgetown build

clean:
		bundle exec bridgetown clean
