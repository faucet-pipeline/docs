class Navigation < Bridgetown::Component
		def initialize(resource:)
				@resource = resource
		end

		def nav_link(title:, href:)
				item_class = href == @resource.relative_url ? ' class = "selected"' : ''
				"<li#{item_class}><a href=\"#{href}\">#{title}</a></li>"
		end
end
