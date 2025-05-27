module Jekyll
  module ReferralFilter
    BASE  = "https://app.hyperliquid.xyz/join/VN84"

    # Usage: {{ "/trade" | link_to_hl }}
    def link_to_hl(path)
      path = "" if path == "/"
      "#{BASE}#{path}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::ReferralFilter)
