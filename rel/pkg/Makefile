VERSION=0.6.2
COMPONENT=fifo-jingles
DEPS="nginx>=1.3.13"

include pkg.mk
.PHONY: package prepare clean

package: prepare $(FILE).tgz

prepare:
	-rm -r $(STAGE_DIR)/$(COMPONENT)
	mkdir -p $(STAGE_DIR)/$(COMPONENT)
	cp ../../LICENSE* $(STAGE_DIR)/$(COMPONENT)
	cp -r ../../config $(STAGE_DIR)/$(COMPONENT)
	cp -r ../../dist/* $(STAGE_DIR)/$(COMPONENT)

clean: clean-pkg
	-rm *.tgz
